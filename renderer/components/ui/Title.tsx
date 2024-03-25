interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    
}

export const Title: React.FC<TitleProps> = ({children, ...props}) => {
    return (
        <h1 {...props} className={`text-lg first-letter:uppercase font-semibold ${props.className}`}>
            {children}
        </h1>
    )
}