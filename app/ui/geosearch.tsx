'use client'
import { ChangeEvent, useEffect, useRef, useState } from "react"

export default function GeoSearch() {
    // Debounce search to not slam API with calls for every keystroke
    const timer = useRef<NodeJS.Timeout | null>(null)
    const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
        return (...args: Parameters<T>) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                func(...args);
            }, delay);
        }
    }

    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current)
            }
        }
    })

    const [query, setQuery] = useState("")

    
    // Runs on input box change
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.currentTarget.value;
        debounce(search, 500)(input);
    }

    const search = async (input: string) => {
        if (!input) {
            setQuery("")
            return
        }
        // just printout query for now
        const url = `/api/places?query=${encodeURIComponent(input)}`
        try {
            const response = await fetch(url);
            const data = await response.json()
            console.log(data.predictions)
            // setQuery(data.predictions)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="w-[50vw] text-xl border-2 p-2 flex flex-col focus-within:border-2 focus-within:ring-4">
            <input className="inset-5 bg-background focus:outline-none" onChange={handleInputChange}/>
            <div className="border-t-2 text-wrap break-all">{query}</div>
        </div>
    )
}