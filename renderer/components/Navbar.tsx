import Link from "next/link"
import Button from "./ui/Button"

const Navbar = () => {
    const items = [{
            name: "Inicio",
            path: "/home"
        },
        {
            name: "Configuracion de OBS",
            path: "/configurationObs"
        }
    ]

    return(
        <div className="w-screen grid grid-cols-3">
            <span className="flex justify-center gap-4 col-span-3">
                {
                    items.map((item, index) => 
                        <Link className="place-self-center" href={item.path} key={index}>
                            <Button className="w-fit">
                                {item.name}
                            </Button>
                        </Link>
                    )
                }
            </span>
        </div>
    )
}

export default Navbar
