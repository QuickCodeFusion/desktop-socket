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
        },
        {
            name: "Configuracion remota ",
            path: "/remoteConfig"
        },
        {
            name: "Conexiones a OBS",
            path: "/conexionesObs"
        }
    ]

    return(
        <div className="w-screen grid grid-cols-3 p-2 bg-obs-blue-500/55">
            <span className="flex justify-center gap-4 col-span-3">
                {
                    items.map((item, index) => 
                        <Link className="place-self-center" href={item.path} key={index}>
                            <Button className="w-fit bg-obs-blue-500">
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
