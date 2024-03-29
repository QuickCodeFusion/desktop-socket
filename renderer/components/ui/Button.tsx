
const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    return (
        <button {...props} className={`${className} bg-obs-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-obs-blue-400`}>
            {children}
        </button>
    )
}

export default Button