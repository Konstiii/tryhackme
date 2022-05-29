import { JwtPayload } from "jsonwebtoken"

export default interface Payload extends JwtPayload {
    readonly role: 'muggle' | 'wizard'
}
