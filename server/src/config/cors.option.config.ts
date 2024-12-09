import { config } from "./config"

const {host} = config

const allowedOrigins: string[] = [host]
const corsOptions = {
    origin: (origin: string | undefined,  callback: (err: Error | null, allow: boolean) => void)=> {
        if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'), false)
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
export {corsOptions}