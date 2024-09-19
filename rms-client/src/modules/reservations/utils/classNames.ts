// utils/classNames.ts

export const getClassNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
  };
  