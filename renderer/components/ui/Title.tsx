interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    
}

export const Title: React.FC<TitleProps> = ({children}) => {
    return (
        <h1 className="text-lg first-letter:uppercase font-semibold">
            {children}
        </h1>
    )
}