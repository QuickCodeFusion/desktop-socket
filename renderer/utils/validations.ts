
export const validateIpV4 = (ip: string) => {

    const ipV4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    return ipV4.test(ip)
}

export const validatePort = (port: string) => {
    const portRegex = /^\d{1,5}$/
    return portRegex.test(port)
};
