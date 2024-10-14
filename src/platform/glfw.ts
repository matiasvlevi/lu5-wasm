import { LU5 } from "../lu5";
import { write_cstr } from "../memory";

export function lu5_GetKeyName(this:LU5, key: number, _scancode: number) 
{
    if (this.keyname_ptr == null) {
        this.calls.free(this.keyname_ptr);
    }
    
    let name: string|null = null;

    // check if alphanumeric and return the character
    if (key >= 65 && key <= 90) {
        name = String.fromCharCode(key);
    }

    // Numbers
    if (key >= 48 && key <= 57) {
        name = String.fromCharCode(key);
    }

    // Numpad
    if (key >= 320 && key <= 329) {
        name = 'Numpad ' + (key - 320);
    }

    // Function keys
    if (key >= 290 && key <= 299) {
        name = 'F' + (key - 290 + 1);
    }

    if (name === null) {
        this.keyname_ptr = null;
        return this.keyname_ptr;
    };

    
    this.keyname_ptr = this.calls.malloc(name.length);
    write_cstr(this.memory, this.keyname_ptr, name);

    return this.keyname_ptr;
}