import Persistent from "../../src/decorators/Persistent"
import { NativeQuery } from "../../src/decorators/Queries"

@Persistent()
export class SQLConnectorUserRepository<T> {
  
    @NativeQuery("SELECT * FROM test LIMIT 1")
    checkQuery(): Promise<[T]> {
        return new Promise(() => {
        })
    }

}