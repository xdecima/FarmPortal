import { useState } from "react"

function App() {
    const [treeType, setTreeType] = useState("olive");
    const [length, setLength] = useState("");
    const [depth, setDepth] = useState("");
    const [result, setResult] = useState("");

    const submitHandler = async () => {
        const response = await fetch("http://127.0.0.1:5000/calculate", {
            method: "POST",
            body: JSON.stringify({
                tree_type: treeType,
                length: Number(length),
                depth: Number(depth)
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        setResult(data.risultato)
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4 w-96 bg-slate-100 border border-slate-300 rounded-md p-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="tree_type">Tree</label>
                    <select id="tree_type" value={treeType} onChange={(e) => setTreeType(e.target.value)} className="border border-slate-300 bg-slate-200 px-2 py-1 rounded-sm">
                        <option value="olive">Olive</option>
                        <option value="bergamotto">Bergamotto</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="length">Length</label>
                    <input type="text" id="length" value={length} onChange={(e) => setLength(e.target.value)} className="border border-slate-300 bg-slate-200 px-2 py-1 rounded-sm" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="depth">Depth</label>
                    <input type="text" id="depth" value={depth} onChange={(e) => setDepth(e.target.value)} className="border border-slate-300 bg-slate-200 px-2 py-1 rounded-sm" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="result">Result</label>
                    <input type="text" id="result" value={result} readOnly className="border border-slate-300 bg-slate-200 px-2 py-1 rounded-sm" />
                </div>
                <div className="flex flex-row justify-end gap-1">
                    <button onClick={submitHandler} className="bg-slate-700 hover:bg-slate-900 text-white px-2 py-1 rounded-md cursor-pointer transition-colors">Calculate</button>
                </div>
            </div>
        </div>
    )
}

export default App
