declare module 'caramelcookie' {
  interface Cookie {
    name: string;
    value: string;
    expires: string;
    path: string;
    secure: boolean;
    domain: string;
    setDocCookieStr(cookieStr: string): void;
    getDocCookieStr(): string;
    getUrlAsDomainStr(url: string): string;
    getAsCookieStr(): string;
    setDomain(dmn: string): void;
    setName(name: string): void;
    getAsCrumbStr(v?: string): string;
    setValue(v: string): string;
    setExpires(opts: object): void;
    set(): void;
    rm(): void;
  }

  export function getNew(name: string, value: string, params: object): Cookie;
  export function set(name: string, value: string, params: object): void;
  export function getall(): { [cookie: string]: string; };
  export function getExisting(cookieName: string): Cookie | null;
  export function rm(name: string): void;
  export function get(name: string): string
}
