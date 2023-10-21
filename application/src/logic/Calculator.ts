export abstract class Calculator<Input, Output> {
    abstract calculate(input: Input): Output;
}
