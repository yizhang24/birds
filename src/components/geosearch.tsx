'use client';
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { lookup } from "@/utils/fipsLookup";

interface Prediction {
    description: string,
    place_id: string
}

export default function GeoSearch() {
    // Debounce search to not slam API with calls for every keystroke
    const timer = useRef<NodeJS.Timeout | null>(null);
    const debounce = <T extends (...args: never[]) => void>(func: T, delay: number) => {
        return (...args: Parameters<T>) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const [uuid, setUuid] = useState('');

    const generateUuid = () => {
        const storedUuid = sessionStorage.getItem('sessionId');
        if (storedUuid) {
            setUuid(storedUuid);
        } else {
            const newId = v4();
            setUuid(newId);
            sessionStorage.setItem('sessionId', newId);
        }
    };

    useEffect(() => {
        return () => {
            sessionStorage.clear();
            setUuid('');
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, []);


    const [predictions, setPredictions] = useState<Prediction[]>([]);

    // Runs on input box change
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.currentTarget.value;
        debounce(search, 500)(input);
    };

    const search = async (input: string) => {
        if (!input) {
            setPredictions([]);
            return;
        }
        if (uuid == '') {
            generateUuid();
        }
        const url = `/api/places?query=${encodeURIComponent(input)}&sessionId=${uuid}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if(data.predictions) {
                setPredictions(data.predictions);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const selectItem = async (locationId: string) => {
        const url = `/api/regions?query=${encodeURIComponent(locationId)}&sessionId=${uuid}`;
        const response = await fetch(url);
        const data = await response.json();
        setUuid('');
        console.log(data.result.address_components[1].long_name);
        console.log(lookup(data.result.address_components[2].short_name, data.result.address_components[1].long_name));
    };

    const colors = ["yellow", "green", "purple", "pink"];
    const getBackgroundColor = () => {
        const val = Math.random() * 4;
        return "var(--" + colors[Math.floor(val)] + ")";
    };

    return (
        <div className="relative w-[50vw] text-xl border-2 flex flex-col focus-within:ring-2">
            <input className="m-2 inset-5 bg-background focus:outline-none z-10" onChange={handleInputChange} />
            <div className="absolute mt-[1.75/2rem] pt-12 w-full z-0">
                {predictions.length > 0 && (
                    <ul className="border-2 px-2 border-black bg-background">
                        {predictions.map((prediction: Prediction, index: number) => (
                            <li className="my-2 hover:underline group" key={prediction.place_id}>
                                <style>{`.list-item-${index}:hover{background-color: ${getBackgroundColor()};}`}</style>
                                <div className={`list-item-${index}`} onClick={() => selectItem(prediction.place_id)}>{prediction.description}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
}