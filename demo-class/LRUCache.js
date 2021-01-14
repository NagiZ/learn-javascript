class DulNode {
    constructor(key, value) {
        this.value = value
        this.key = key
        this.next = null
        this.prev = null
    }
}
class DUL {
    constructor() {
        this.head = new DulNode()
        this.tail = new DulNode()
        this.head.next = this.tail
        this.tail.prev = this.head
    }
    addToHead(node) {
        node.prev = this.head
        node.next = this.head.next
        this.head.next.prev = node
        this.head.next = node
    }
    removeNode(node) {
        node.prev.next = node.next
        node.next.prev = node.prev
    }
    moveToHead(node) {
        this.removeNode(node)
        this.addToHead(node)
    }
    removeFromTail() {
        let node = this.tail.prev
        this.removeNode(node)
        return node.key
    }
}
class LRUCache {
    constructor(capacity) {
        this.MAX_SIZE = capacity
        this.storagePool = new Map()
        this.size = 0
        this.dulStorage = new DUL()
    }
    get(key) {
        let result = -1
        if (this.storagePool.has(key)) {
            let node = this.storagePool.get(key)
            if (node.key === key) {
                result = node.value
                this.dulStorage.moveToHead(node)
            }
        }
        return result
    }
    put(key, value) {
        const isKeyed = this.storagePool.has(key)
        if (isKeyed) {
            let node = this.storagePool.get(key)
            node.value = value
            this.dulStorage.moveToHead(node)
        } else {
            let node = new DulNode(key, value)
            this.storagePool.set(key, node)
            this.dulStorage.addToHead(node)
            this.size++
            if (this.size > this.MAX_SIZE) {
                let removedKey = this.dulStorage.removeFromTail()
                this.storagePool.delete(removedKey)
                this.size--
            }
        }
    }
}