/**
 * An abstract generic calculator for various calculations used in the application.
 *
 * @typeParam Input - The type of input data for the calculation.
 * @typeParam Output - The type of output result from the calculation.
 */
export abstract class Calculator<Input, Output> {
    /**
     * Abstract method to perform a calculation based on the provided input data.
     *
     * @param input - The input data for the calculation.
     * @returns The calculated result of the operation.
     */
    abstract calculate(input: Input): Output;
}
