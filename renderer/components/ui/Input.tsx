interface InputProps {
    type: string
    label?: string
    setValue: React.Dispatch<React.SetStateAction<any>>
    name: string,
    value: string
}
const Input = ({type, label, setValue, name} : InputProps) => {

    return (
        <div className="flex items-center justify-self-end m-2">
            {label && <label className="">{label}</label>}
            <input className="bg-gray-100 border text-gray-950 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 m-2 " type={type} name={name} onChange={setValue}/>
        </div>
    )
}

export default Input