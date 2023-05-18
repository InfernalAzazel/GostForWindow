export interface Proxy {
    name?: string
    cmd?: string
}

export interface ProxyYaml {
    proxy?: Proxy []
}