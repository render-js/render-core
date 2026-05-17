export default interface LintError {
    rule: string;
    message: string;
    line: number;
    column: number;
}
