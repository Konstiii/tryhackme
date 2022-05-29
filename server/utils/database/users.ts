import DatabaseService from '@/server/utils/database/service'
import User from '@/server/utils/database/models/user'
import { randomUUID } from 'crypto'

interface InternalUser extends User {
    password: string
}

export interface Database {
    state: {
        morsmordre: boolean
    }
    users: InternalUser[]
}


class DatabaseServiceImpl implements DatabaseService {

    private database: Database = {
        state: {
            morsmordre: false
        },
        users: [{
            id: '4468585d-8640-4b30-abd5-205df0bf6e42',
            username: 'vernon',
            password: 'dursley',
            avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRUVFhUSGBgaGRgVFRgSGBIYGBgVGBgaGRgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGBIRGjEhGCExNDQ0NDE0MTQxMTQxNDE0MTE0MTQ0MTE0NDQ0Pz80NDQ0NDQxPzQxMTQ0PzQ0PzE0Mf/AABEIAJYBUQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EADkQAAIBAgQEAwYFAwQDAQAAAAECAAMRBBIhMQVBUWEGcZEiMoGhscETFELR8FJicgcjguEkorIV/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIREBAQEBAAIDAQADAQAAAAAAAAECESExAxJBcSJRYQT/2gAMAwEAAhEDEQA/APPnwuU3RivxNpIuLdNGQMOq7y1l1jZfrMO9bSGp46m+mx6MJMaQOokDYZW3UGQ/lWX3HI7HURePw/6tFTEJXGMddHS46prJ6WIR/dYX6HeCbmX0lBkiSMi0NGgXLElo4EYQhERWiAhrHywCIiDlkxgxhHaJXI2NobQCIBZpY4j3tZaSuG2My2EEaRBsFoxeZa4xhvrJFxQPP1jC6XjXkWFbMw6DXXaWMTjUF9AB3gJFR0PUSrWTfrJKtdDrmNuljAfFgba/CNSpUpE6ax6WEN9wO00KeIQ2Nj8JcpOgtcE+kVo+qnh8E2+/0k7YE9Cp+UvIq7oSO0nqPpp05ybpf0YrYQg2I9DoZHiMKF2J8jNp6gIta37ynUQDc+t9f595U0nWWHU03lWpiwO82MVhQwI3+UyE4W7OEQXvzOw7mVKz4q1MQzdhI7TuuFeHKIBV1zkjVjyP9vSY/ibgyUGQpmAa9wTcQ+x8YKrDECGBKIogLQ7RrRDgTCEeMYADRrQzBYRgskUGxigTTDbxA7esD9MfmfSZtk67RAbxmMbNpJUFUlfE4ZW3Hx2MuAyE63PUxy1NilldRdXv2bUR/wA+Ro6Ed11EtusjCD5SukVLGA+6wPbnLKY1eekzMRhFPKx6jQyqy1F0Vsw6N+8fJfSXU0qgOxBkhnIpjip9oMh6iX8PxVv6lYdzr6xXNT1vWitKNPiSH3rqe+3rLiuCLggjtJs4ZGBDaDeAAYLCHaCTGEDrGwlLO6i1+Z1toN4VSX/D1O9RzocqM2U89gPjc+l4wtNhPy6lr5rCxve9m0BMw69QHcEk62OwHebGOrEoyt+okjsbj5abTJdLXuDc/QaQVIiKsf5yky4E73j0pdWK1rMxHQo6bS5k2EBDaEXuZFtXMyLKGwkqteVKZuZbpCTWmUhp3HflMis5vbppNoCZnE6VmDAaHfzjzfKfkz4Q0TcgGQVSyPmX9Ov7/Ay9huUq8ZFmzLoLC/n+00lc2o6jAVA6q42YX+PMTG8bJ7CN0a3qJa8N18ydw1rf8Rb7wfGFO+Hv0ZT9oFPThhHEAQlEtIrxXiMVoAlMV7x4toAJSIwiYBMAV48G8eBLz8hFT3+N4CvcntJKQ1kNJRk3iaIR+ckw1m2ERGwjbt5Q3GolALrBAhkRuUBxA8rsJYqiQMI4moHQSrUwq8rg9QZeOwkbS5UcURnWwuGBNtd52Pg3hy1RVZ72AUCx2JuftOUqDb4n+es77wGMtFzY2L7+Sj94aOJcTwJx7jBh0bQ+sy61BkPtKw8x952+ZTzjPRB0IB85nw/DgjCSgWFx85reI8KiBcos7HS21huSJBg8MQtz0NpN8NMZl9sdxNzwUFNZ1YgA02397Qj3Op5/CYtdSpswIPQixh8KxxoVkqC3strcX9k6H5Soy/Wn4koZKuQZiRa1+h2mbxR/ayjkAPSddx7AlsSjn3HysD/bbQ/ATheKlhUYC+59L6RtJT0qk0aBuLTA/FK+9f4iX8HirEa3BiuVZ01RCQbyqK1zpLiiwudpFazyPDoTNGjQIG8yzjVTvJk4lrYKT35RcV9pGkBbnKnE1ul+h+sjoYq51B/aWMePYNu0n0dsuapYJLqG5Bgpv/de3zEHjpVWFhuPp1lugoWg9/1MLfA3v6zL4gxe51J5X5X1muXLpo+FKZCOx5vYeSjX5mX/ABOmbDVOwB9CIHAaLJSUEADUqB8ye5Mt8ZTNQqj+wn01lVMeZiOpkYaHmlJEDHJgAwhAHjkRWjwADGIhWjmOAGQx4s3nFAJ6Y0PcydOsiJvtCDTOnEkdDBUxMbQVKenuY7trGo7Qam4gYyYlGkY/aEdogrvIXlhxIHEcTUTSJ5MwkDy4lEfeHkZ6T4JBXCqerufQgfaebHf5Tv8Aw9UZMPTAO4LW/wAiTCh07FDuLHqILpa5Diw1N+QmevEf6l9Jn8d4iMqIptmPt/4iRRnzVdicRVLnYeynkOc3KOGFwNLAXt1MqcMoqu3mJrKoI1HxkTzXTrmc/wDUGJwqsLMoI7zAx3AUPuEqem49J0TJb3T6yB3Ol1v5bzRzNvhtVKiomVS1BHpNYb5E5X5XB9J5n4ppfhVLXDFtgv8ATlFvrOz8Ks643GqynI6VcQmmmVibf/dvhOL4rWz1WYAAe6AByEOtOMtOIG2V6Rt3F5WQgsctx2PKXXVjpeCtACHRytHhiZtJuY3hodNyLam31mRwdPam9inOUgEi+mnSZ6vl04z3Lma7qm7KLDW+8ucLxdI65mIvbNYhSRuM23Mesjq8OUG+UG+9/wDuaXD8NSVcpXTU5dbXO5y7dJXZxEzereRWAK7QsSl0I7RYaiFFl25SatsR2mVvltJ4U1GYKptYLrfqYD0g5VEHPU8haO6Wp1mHvBGYdiovLHhel7CltTl37k3l5vWG88zbWxTo5VC9BaRYxbo46qw+UuZZC43HnNK548eJsT5mFmjYlcruOjMPQmMplxNTJJFMhUwhAJrxBoAaEIh0WaCTEFEZhAHijesUAsgx7yMmINJ4pMsTtyEANpCorrcwCwi6QHXUSUQWiWjYSV9oAENliCBjIDLDrISNY4mq5kbyRpE+0uJqHmZ6Bghami9EX6TgE1PxnapiLADoAPQRaC6ZmqPxHLWuBoLyV8ToYuGHLa8jS/jna3sAllkP/wCkykggEXtpobSRcciDVgPjMhqgJJuNdZOfDT5r4jVfHq2xI8461785jhh1EJTbaaOfzHoHhugGDsQMzUihboilrD1M8gxNw7A8ifrPZsHS/AoqxBP+2iHlqy5j9flPIPEVRfx3C8tD3N/2tK1nkjTNV2cASFXubSF3NpAcTlW50uecmQ7XScLU8pvU0zLrpMPw9igVvpp6TYXFJVzBHQkXBCmZ6nl04s5FeosOjTEzqGKuSp3BsZp0BeTYqLtPaDWiVCI7iR6WysQ7qzi3sGm5+JBFvpNnw9hrBmIItlVehAAubed5TxFMEWPb6zpsLTsijtr5mbfF5rD57zMhASsd5eKSm+5munLl5HxlMteqv97fM3lRZqeKaeXFVe7BvUCZixz0m+xrJAZEJKpjAxHBjAx4gRaImCY4EAVzFFaKASkxs0a8ECSaVDJwZXpSzbnEEqHlDqbGAo2MmcaGKtMo1XaSuIyjUCE8mqVXEgfnLLytUbSVEVWaQudJK5ldzpLiDUBcqOrD6zsHScpw5b1KY6sv1nXVBFoKVbSS4ZWY2BlWo9yfST4aoVPnvJrXE9LzYLqbyVMKZH+atLlJ3I1mfptyGpcPvylmnw4A6jSAmIddgD6yWnj2v7Qt3EP0+T/TvfGuJFLCZgNSyIg6swsB6fSeA12OYk731+E9K8W+IDisLTQrlZamV7bGy+yw89Z5nVQliBvc29Zvb1zSWe0SksbcucsvTV7C20rohUa79pPRfS3WFK1f4a607i1wRtNDC1KYbMEVWN7sumsxqbjN/Ok0MMR95Go0xrjQx2E9kVUNyPfHUdZd4VXvaUsJiMvcbEdZNTQI4IPsNqv3Eit83ra0MFxGXSK95nWsAUzEDlz8u06xKVhPNfF2LenTQo7IxfdDY2Cn1G0x8H4+x1Mi9Rag6VUU/wDstjOj4c+OuP8A9Gv8ufj2JqcoYhPaM4ZP9UHO+Gpd7PUF/LQy5h/9QKLsBUpvT2FwQ6+egBtL1PDHOo5/xulsST1VT8rTBE6LxriEqVKb03V1Kbob8zv0nNgwz6LXsYkggIIcZQUMSNZJEYY9u8V4xMAUUaKASgRLGvDWSaTDCW1WVKEuIJNODtJGEGETpEuEu8GpzjZ9ZDUqWvDgtC7ynXeKrUlWo8uRnaJ3kTHQxFryOo2kuEvcHH+8nY/QXnT1msCZznAResvYMflb7zcx1Qe6CL7kD7yNezkU01MsKb6SFRJqAiaxOq7TawL33mMgmhhqlpnWubxtfhr2g/llPSUsPULGSujA5gT0IO0lpGV4mtTo2vbM6lfNbm/pec7g8OhR3dwGGiJrcn+onkJH4y4sXrKgNxT37sd/lM1KoIuJvnNmXLvUuqsYh7Gwg0KbE31hUGBlm2ukfSkJcMJao4QtoGIvpr0lzC0xYaTaSgLbbSLeN84lYZolLLmvpp+0tYWoTZTtf0mn+TDjUWiThyrrcmZ3Svpe+F6gdLQnXSV6ZkPGOILRpM7EaCyjqx2Ak+7yNuyTrj/GGOz1hTB0Qa/5Nv8AK3rOeKwq7lmDk6sTm8zrJGE7c55njzPk19tWoBT7QoeWOqxoMhk6iRgQlOsnhpFhkwSl5CzMmp1HzEOGsjWEJEjhhcGHJMRjGINFAFYRR4oBIsdTIlMJHiNapy0jSijyYVJPAs5oL1NJWarKtSvCZHVxq28q1K0qire8ZmlzJdGzwDzg3j3j4CLSNyNPOA7X0lfPfr2jkLrQwfFGol2VVLMjIGbXKGKkso/q9m2vWa3DUIUFiSze0xO5J6zBwGHzuF5bt5CdSqydLxP0pNTEhEtUReQ0iekJdo07yKhSvNXDUbTO1rIfDYe0vog5yvUbKLyvxTiK00DXA5m97AD7yfNaeJHIf6i8PRClRbBmJVrc7C95x+Hr5T25zZ47xI4l8+uUCyA9OsyHodJ1YlmZK4fk1Lq2LyG+qkS5havXQ95gozIbiaWH4oumYa9eUdyM6dNhaoI0POadLE2sOU53BV0Yggi3ab9AKRMNeHTjfWimKB0EPfczNqVkpAs7BR1P81mFxXxdcFaAN9s7Aaf4r9zImNa9NL8mczy2+L8bp4fQnM/JBv5k8hOF4txGpXOZzoPdUe6oPT95nVHLEkkknUk6kmWXHsjva06M4mf65d/LdfxJUS9P4AwqBzAGT1Esh/xP0lPAPuP5aaMFkiCVkhGsZoGFFitrHI000jBbQCalJSsgpmWVgGa6/htce6dx0Mto17WklWmCCDsZRoMUYqduR7RWBcj5oNo0kx2igRQAr2iRtYJgBt/OHDWc8Z6krl4xaHB0bVJGzQSYoF01PnCMSiCxgZwYxbSMDIalXlHAdDIgPqZLTMj6ykum4VQC0ka3vZj6EAS5Cw9L/wAamRulm/4sLH52jqt5hq+a3z6MiS/hqW0ClSmjhaci1pInoUxNGgJTCWlym5AkLgsSQFNyANzfpPL/ABJxkV6mVW9hbqu9iebWnT+NOMBENJWu7j2rfpT/ALnmxFzN/iz+1j82/wAi6GFtDfyiJkSaC0kG03cwWEr5NZbkZiCZKwvzXpt9Zbw3FHDhc+Vb2JJsB59pnWlmji9MjAdr7GTZ1couJK1yPxPxDf8ASWb2elzymVebXCkanVV9LAjOBsUJ1v8AzlJvFPCfw6pdB7DWbyJ3+H7w7PQst8sGkBfXaXstyo5X+Up06LE6AnXcS8qMpXNtcgekdL8S4l/YYdpm4R7MPSadQix8pjg2MZNq0AiOjXUWhAQATGhGDaAKxEs0mlcySmYBOwlPGUbi43Go8uYl0QWgFRKmYXhEwKdPK5HI6iO41k2AWaPI4oge/wBTAB0iigoRG0jJ1iigRnivHihQddoLx4o4AcjK7iKKE/RRptBcRRSku24RWvRS4uCtmHUbSWlQyuUJuBt5d40U59e66MNOgs0KSR4pnW0GTMjxDxn8vTuFLM2i3tlB6mKKPPuDXiV5zXxDVGZmJLNqSZDSNiRFFOxxVLaPeKKIhKIzCKKBmIk2FdbgMuZSbEc7nmDFFAR1C4NVWwGlue/rJqrZ0AYA5fZN+dtvlFFML7axVTBqNgB5SlxLDgqbaEajzjxSs+yvplIbi8z8RStrHimrNcwDXWWYoogFhGMeKAMDpHpx4owmWSWiigFbFCwzc1Nx9INdtj2jxQoQZ4ooojf/2Q==',
            firstname: 'Vernon',
            lastname: 'Dursley',
            role: 'muggle'
        }, {
            id: '1fa99687-5ced-458e-858e-10638b645873',
            username: 'lord_voldemort',
            password: randomUUID(),
            avatar: 'https://s3-eu-central-1.amazonaws.com/vodafone-featured/wp-content/uploads/2021/02/19173439/harry-potter-szenen-640x360.jpg',
            firstname: 'Tom',
            lastname: 'Riddle',
            role: 'wizard',
            evil: true
        }, {
            id: '9ed35740-3be5-4dea-ad87-d8607c30df60',
            username: 'dumbl3d0r3',
            password: randomUUID(),
            avatar: 'https://assets.cdn.moviepilot.de/files/e2fbdbbc704768d582ebb4ab898ae38165dc39640eb6724312a68db3d7b7/fill/992/477/Albus%20Dumbledore.jpg',
            firstname: 'Albus', // Percival Wulfric Brian
            lastname: 'Dumbledore',
            role: 'wizard',
            flag: 'THM{6bc2a2546f0f413c8c1d23e11904226f}'
        }, {
            id: 'THM{de9a9f4938e849869f167b69c79e9c85}',
            username: 'h4rry_p0tt3r',
            password: randomUUID(),
            avatar: 'data:image/jpeg;base64,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',
            firstname: 'Harry',
            lastname: 'Potter',
            role: 'wizard'
        }]
    }
    
    getUserByID(id: string): Readonly<User> | null {
        const user = this.database.users.find(user => user.id == id)
        delete user?.password
        return user
    }

    getUserByUsernamdAndPassword(username: string, password: string): Readonly<User> | null {
        const user = this.database.users.find(user => user.username == username && user.password == password)
        delete user?.password
        return user
    }

    getAllWizards(): Readonly<User[]> {
        const users = this.database.users.filter(user => {
            return user.role == 'wizard'
        }).map(user => {
            return {
                ...user,
                password: undefined
            }
        })
        return users
    }

    deleteUser(id: string): void {
        const index = this.database.users.findIndex(user => user.id == decodeURI(id))
        if (index >= 0) this.database.users.splice(index, 1)
    }

    // MARK: morsmordre

    getMorsmordre(): boolean {
        return this.database.state.morsmordre
    }

    setMorsmordre(newValue: boolean): void {
        this.database.state.morsmordre = newValue
    }

}

const service = new DatabaseServiceImpl()

export default function useDatabase(): DatabaseService {
    return service
}
