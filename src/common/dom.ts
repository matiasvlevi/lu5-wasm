
export function get_or_create_by_id(tag: string, id: string, host: Element = document.body) {
    let elem = document.getElementById(id);

    if (elem === null) {
        elem = document.createElement(tag);
        elem.setAttribute('id', id);
        if (host) 
            host.appendChild(elem);
        else
            window.onload = () => host.appendChild(elem);
    }

    return elem;
}