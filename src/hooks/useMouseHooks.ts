import React, { useState, MouseEvent } from 'react';

export function useMouseHover<E>(hover = false) {
    const [isHover, setHover] = useState(hover);
    return {
        isHover,
        setHover,
        onMouseEnter: function (event: MouseEvent<E>) {
            setHover(true);
        },
        onMouseLeave: function (event: MouseEvent<E>) {
            setHover(false);
        },
    };
}