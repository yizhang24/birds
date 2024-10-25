'use client';
import { ChangeEvent, useEffect, useRef, useState } from "react";
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

    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    });

    const [predictions, setPredictions] = useState<Prediction[]>([]);

    // Runs on input box change
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.currentTarget.value;
        debounce(search, 500)(input);
    };

    const sampleData = JSON.parse('{"predictions":[{"description":"Davis, CA, USA","matched_substrings":[{"length":5,"offset":0}],"place_id":"ChIJP1SVlJkphYAR_4_ibhs_AcM","reference":"ChIJP1SVlJkphYAR_4_ibhs_AcM","structured_formatting":{"main_text":"Davis","main_text_matched_substrings":[{"length":5,"offset":0}],"secondary_text":"CA, USA"},"terms":[{"offset":0,"value":"Davis"},{"offset":7,"value":"CA"},{"offset":11,"value":"USA"}],"types":["geocode","political","locality"]},{"description":"Davis, WV, USA","matched_substrings":[{"length":5,"offset":0}],"place_id":"ChIJhRV4mNTLSogRDls-ZeSXl0E","reference":"ChIJhRV4mNTLSogRDls-ZeSXl0E","structured_formatting":{"main_text":"Davis","main_text_matched_substrings":[{"length":5,"offset":0}],"secondary_text":"WV, USA"},"terms":[{"offset":0,"value":"Davis"},{"offset":7,"value":"WV"},{"offset":11,"value":"USA"}],"types":["locality","political","geocode"]},{"description":"Davison, MI, USA","matched_substrings":[{"length":5,"offset":0}],"place_id":"ChIJvVJTcIh-JIgRgFDLBBejEF4","reference":"ChIJvVJTcIh-JIgRgFDLBBejEF4","structured_formatting":{"main_text":"Davison","main_text_matched_substrings":[{"length":5,"offset":0}],"secondary_text":"MI, USA"},"terms":[{"offset":0,"value":"Davison"},{"offset":9,"value":"MI"},{"offset":13,"value":"USA"}],"types":["geocode","political","locality"]},{"description":"Davis, OK, USA","matched_substrings":[{"length":5,"offset":0}],"place_id":"ChIJ4zH-WkPYsocR38st5i-cN0w","reference":"ChIJ4zH-WkPYsocR38st5i-cN0w","structured_formatting":{"main_text":"Davis","main_text_matched_substrings":[{"length":5,"offset":0}],"secondary_text":"OK, USA"},"terms":[{"offset":0,"value":"Davis"},{"offset":7,"value":"OK"},{"offset":11,"value":"USA"}],"types":["locality","political","geocode"]},{"description":"Davisville, WV, USA","matched_substrings":[{"length":5,"offset":0}],"place_id":"ChIJ-TIiRcGySYgRudA5O1aZHkQ","reference":"ChIJ-TIiRcGySYgRudA5O1aZHkQ","structured_formatting":{"main_text":"Davisville","main_text_matched_substrings":[{"length":5,"offset":0}],"secondary_text":"WV, USA"},"terms":[{"offset":0,"value":"Davisville"},{"offset":12,"value":"WV"},{"offset":16,"value":"USA"}],"types":["geocode","political","locality"]}],"status":"OK"}');

    const search = async (input: string) => {
        if (!input) {
            setPredictions([]);
            return;
        }
        // const url = `/api/places?query=${encodeURIComponent(input)}`;
        try {
            // const response = await fetch(url);
            // const data = await response.json();
            // if(data.predictions) {
            //     setPredictions(data.predictions)
            // }
            setPredictions(sampleData.predictions);
        } catch (err) {
            console.log(err);
        }
        for (let index = 0; index < predictions.length; index++) {
            console.log(predictions[index].description);
        }
    };

    const colors = ["yellow", "green", "purple", "pink"];
    const getBackgroundColor = () => {
        const val = Math.random() * 4;
        return colors[Math.floor(val)];
    };

    return (
        <div className="relative w-[50vw] text-xl border-2 flex flex-col focus-within:ring-2">
            <input className="m-2 inset-5 bg-background focus:outline-none z-10" onChange={handleInputChange} />
            <div className="absolute mt-[1.75/2rem] pt-12 w-full z-0">
                {predictions.length > 0 && (
                    <ul className="border-2 px-2 border-black bg-background">
                        {predictions.map((prediction: Prediction) => (
                            <li className="my-2 hover:underline group" key={prediction.place_id}>
                                <a className={`group-hover:bg-${getBackgroundColor()}`}>{prediction.description}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
}