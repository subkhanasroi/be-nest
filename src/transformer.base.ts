export class BaseTransformer {
    static transform(data) {
        const array = []

        data.array.forEach(element => {
            array.push(this.singleTransform(element))
        })
        return array
    }
    static singleTransform(element) { }
}