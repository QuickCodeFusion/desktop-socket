interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    type: string
    label?: string
    setValue: React.Dispatch<React.SetStateAction<any>>
    name: string
}

const Input: React.FC<InputProps> = ({type, label, setValue, name, className, ...props}) => {
    return (
        <div className="flex items-center justify-self-end m-2">
            {label && <label className="">{label}</label>}
            <input
            {...props}
            className={`bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 m-2 text-black ${className}`}
            type={type}
            name={name}
            onChange={setValue}
            />
        </div>
    )
}

export default Input