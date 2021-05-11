import { NativeQuery, NamedQuery } from "../src/decorators/Queries";

test('should throw error if sql query decorator is empty', () => {
    expect(NativeQuery("")).toThrow()
})

test('should throw error if sql query decorator is empty', () => {
    expect(NamedQuery("")).toThrow()
})