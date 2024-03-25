interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string
    label?: string
    setValue?: React.Dispatch<React.SetStateAction<any>>
    name?: string
}

const Input: React.FC<InputProps> = ({type = "text", label, setValue, name, className, ...props}) => {
    return (
        <div className="flex items-center justify-self-end m-2">
            {label && <label className="">{label}</label>}
            <input
            {...props}
            className={`${className} bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 m-2 text-black `}
            type={type}
            />
        </div>
    )
}

export{ Input }