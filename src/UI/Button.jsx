import "./Button.css";

export default function Button({children,textOnly,className , ...props}){

    let cssClasses =textOnly?'custom_text-button':'custom_button';
    cssClasses+= ' ' + className;
    return <button className={cssClasses} {...props}>{children}</button>;
}