

async function get_script_source(script: Element): Promise<string> {
    let src = script.getAttribute('src');
    return (src) ?
        fetch(src).then(r => r.text()) :
        script.textContent;

}

function get_canvas_id(script: Element): string {
    if (script.hasAttribute('canvas')) {
        return script.getAttribute('canvas');
    }
    else if (script.hasAttribute('src')) {
        return script.getAttribute('src')
            .split('/').join('').split('.')
            .filter(l => l.length != 0).pop();
    }
    return '';
}

export async function get_script(): Promise<{ id: string, source: string }> {
    const script = document.querySelectorAll('script[type="text/lua"]')[0];

    if (script == undefined) {
        return { id: '', source: '' };
    }

    return {
        id: get_canvas_id(script),
        source: await get_script_source(script)
    };
}