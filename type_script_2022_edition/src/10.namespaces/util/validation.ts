namespace App {
  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export function validate({
    value,
    required,
    minLength,
    maxLength,
    min,
    max,
  }: Validatable): boolean {
    let isValid = true;
    const valueLength = value.toString().trim().length;

    if (required) {
      isValid = isValid && valueLength !== 0;
    }

    if (minLength != null && typeof value === 'string') {
      isValid = isValid && valueLength >= minLength;
    }

    if (maxLength != null && typeof value === 'string') {
      isValid = isValid && valueLength <= maxLength;
    }

    if (min != null && typeof value === "number") {
      isValid = isValid && value >= min;
    }

    if (max != null && typeof value === "number") {
      isValid = isValid && value <= max;
    }

    return isValid
  }
}