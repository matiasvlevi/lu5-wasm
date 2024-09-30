export const RELEASE = 0;
export const PRESS = 1;
export const REPEAT = 2;

const MOD_SUPER = 0x0008;
const MOD_CONTROL = 0x0002;

/**
 * Get the GLFW mod bits from a KeyboardEvent
 * 
 * @param e The event
 * @returns the GLFW mod bits
 */
export const fromKeyboardEvent = (e: KeyboardEvent) =>
    (+e.metaKey << MOD_SUPER) |
    (+e.ctrlKey << MOD_CONTROL);

/**
 * KeyboardEvent keyCode to GLFW Key Map
 */
export const fromKeyCode = {
    8:   259,  // Backspace
    9:   258,  // Tab
    13:  257,  // Enter
    16:  340,  // Shift (Left Shift)
    17:  341,  // Ctrl (Left Ctrl)
    18:  342,  // Alt (Left Alt)
    19:  284,  // Pause
    20:  280,  // Caps Lock
    27:  256,  // Escape
    32:   32,  // Space
    33:  266,  // Page Up
    34:  267,  // Page Down
    35:  269,  // End
    36:  268,  // Home
    37:  263,  // Left Arrow
    38:  265,  // Up Arrow
    39:  262,  // Right Arrow
    40:  264,  // Down Arrow
    45:  260,  // Insert
    46:  261,  // Delete
    48:   48,  // 0
    49:   49,  // 1
    50:   50,  // 2
    51:   51,  // 3
    52:   52,  // 4
    53:   53,  // 5
    54:   54,  // 6
    55:   55,  // 7
    56:   56,  // 8
    57:   57,  // 9
    65:   65,  // A
    66:   66,  // B
    67:   67,  // C
    68:   68,  // D
    69:   69,  // E
    70:   70,  // F
    71:   71,  // G
    72:   72,  // H
    73:   73,  // I
    74:   74,  // J
    75:   75,  // K
    76:   76,  // L
    77:   77,  // M
    78:   78,  // N
    79:   79,  // O
    80:   80,  // P
    81:   81,  // Q
    82:   82,  // R
    83:   83,  // S
    84:   84,  // T
    85:   85,  // U
    86:   86,  // V
    87:   87,  // W
    88:   88,  // X
    89:   89,  // Y
    90:   90,  // Z
    91:  343, // Left Super (Windows/Command key)
    92:  344, // Right Super (Windows/Command key)
    93:  348, // Menu
    96:  320, // Numpad 0
    97:  321, // Numpad 1
    98:  322, // Numpad 2
    99:  323, // Numpad 3
    100: 324, // Numpad 4
    101: 325, // Numpad 5
    102: 326, // Numpad 6
    103: 327, // Numpad 7
    104: 328, // Numpad 8
    105: 329, // Numpad 9
    106: 332, // Numpad Multiply
    107: 334, // Numpad Add
    109: 333, // Numpad Subtract
    110: 330, // Numpad Decimal
    111: 331, // Numpad Divide
    112: 290, // F1
    113: 291, // F2
    114: 292, // F3
    115: 293, // F4
    116: 294, // F5
    117: 295, // F6
    118: 296, // F7
    119: 297, // F8
    120: 298, // F9
    121: 299, // F10
    122: 300, // F11
    123: 301, // F12
    144: 282, // Num Lock
    145: 281, // Scroll Lock
    186:  59, // Semicolon (;)
    187:  61, // Equal (=)
    188:  44, // Comma (,)
    189:  45, // Minus (-)
    190:  46, // Period (.)
    191:  47, // Slash (/)
    192:  96, // Backtick (`)
    219:  91, // Left Bracket ([)
    220:  92, // Backslash (\)
    221:  93, // Right Bracket (])
    222:  39  // Apostrophe (')
};