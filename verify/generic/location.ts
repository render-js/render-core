export default interface DirectiveLocation {
    directive: string;
    expression: string;
    element: string;
    line: number;
    column: number;
}