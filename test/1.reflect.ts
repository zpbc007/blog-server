const validate = function () {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let method = descriptor.value
        console.log('1', this)
        descriptor.value = function (newValue: string) {
            console.log('2', this)
            if (!newValue) {
                throw Error('非空')
            } else {
                method.apply(this, [newValue])
            }
        }
    }
}

class User {
    name: string
    id: number

    constructor (name: string, id: number) {
        this.name = name
        this.id = id
    }

    @validate()
    changeName (newName: string) {
        this.name = newName
    }
}

let user1 = new User('zp', 1)
user1.changeName('zp2')
console.log(user1)