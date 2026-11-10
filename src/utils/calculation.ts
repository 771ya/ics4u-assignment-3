import { EPS } from "@ics4u-assignment-02/constants";
import type { Coefficients, Coordinate, Results } from "@ics4u-assignment-02/types";

export function calculateParameters(coefficients: Coefficients) {
  const { a, b, c, d } = coefficients;

  const p = (3 * a * c - b ** 2) / (3 * a ** 2);

  const q = (27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);

  const discriminant = (q / 2) ** 2 + (p / 3) ** 3;

  return { discriminant, p, q };
}

export function calculateRoots(coefficients: Coefficients, p: number, q: number, discriminant: number) {
  const { a, b } = coefficients;

  if (discriminant < -EPS) {
    const theta = Math.acos(-q / (2 * Math.sqrt((-p / 3) ** 3))) / 3;

    const rootOne = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a);
    const rootTwo = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3) - b / (3 * a);
    const rootThree = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3) - b / (3 * a);
    return { r1: { x: rootOne, y: 0 }, r2: { x: rootTwo, y: 0 }, r3: { x: rootThree, y: 0 } };
  } else if (discriminant > EPS) {
    const u = Math.cbrt(-q / 2 + Math.sqrt((q / 2) ** 2 + (p / 3) ** 3));
    const v = Math.cbrt(-q / 2 - Math.sqrt((q / 2) ** 2 + (p / 3) ** 3));
    const rootOne = u + v - b / (3 * a);

    return { r1: { x: rootOne, y: 0 }, r2: { x: "Complex Number", y: "Complex Number" }, r3: { x: "Complex Number", y: "Complex Number" } };
  } else {
    if (Math.abs(p) < EPS && Math.abs(q) < EPS) {
      const root = -b / (3 * a);

      return { r1: { x: root, y: 0 }, r2: { x: root, y: 0 }, r3: { x: root, y: 0 } };
    } else {
      const singleY = -Math.cbrt(4 * q);
      const doubleY = -singleY / 2;
      const singleRoot = singleY - b / (3 * a);
      const doubleRoot = doubleY - b / (3 * a);
      return { r1: { x: singleRoot, y: 0 }, r2: { x: doubleRoot, y: 0 }, r3: { x: doubleRoot, y: 0 } };
    }
  }
}

export function evaluateFunction(coefficients: Coefficients, xValue: number) {
  const { a, b, c, d } = coefficients;
  const x = xValue;

  const yValue = a * x ** 3 + b * x ** 2 + c * x + d;

  return yValue;
}

export function calculateCriticalPoint(coefficients: Coefficients): { minimum: Coordinate; maximum: Coordinate; } {
  const { a, b, c } = coefficients;

  const D = b ** 2 - 3 * a * c;

  if (D <= EPS) {
    return {
      maximum: { x: "N/A", y: "N/A" },
      minimum: { x: "N/A", y: "N/A" },
    }
  }
  const xMax = (-b - Math.sqrt(D)) / (3 * a);
  const xMin = (-b + Math.sqrt(D)) / (3 * a);

  const yMax = evaluateFunction(coefficients, xMax);
  const yMin = evaluateFunction(coefficients, xMin);

  return {
    maximum: { x: xMax, y: yMax },
    minimum: { x: xMin, y: yMin },
  };
}

export function formatPolynomial(coefficients: number[]): string {
  let results = "";

  for (let i = 0; i < coefficients.length; i++) {
    const coefficient = coefficients[i];
    const power = coefficients.length - 1 - i;

    if (coefficient === 0) {
      continue;
    }

    let variable = "";

    if (power === 3) {
      variable = "x³";
    } else if (power === 2) {
      variable = "x²";
    } else if (power === 1) {
      variable = "x";
    }

    const absCoefficient = Math.abs(coefficient);

    let numberPart = `${absCoefficient}`;

    if (absCoefficient === 1 && power > 0) {
      numberPart = "";
    }

    const term = numberPart + variable;

    if (results === "") {
      if (coefficient < 0) {
        results = `-${term}`;
      } else {
        results = term;
      }
    } else {
      if (coefficient < 0) {
        results += ` - ${term}`;
      } else {
        results += ` + ${term}`;
      }
    }
  }
  if (results === "") {
    return "0";
  } else {
    return results;
  }
}

export function calculateDerivative(coefficients: Coefficients) {
  const { a, b, c } = coefficients;

  const firstA = 3 * a;
  const firstB = 2 * b;
  const firstC = c;
  const secondA = 2 * firstA;
  const secondB = firstB;

  const firstDerivative = formatPolynomial([firstA, firstB, firstC]);
  const secondDerivative = formatPolynomial([secondA, secondB]);

  return { firstDerivative, secondDerivative };
}

export function rootTypes(discriminant: number) {
  if (discriminant < -EPS) {
    return "3 distinct real roots";
  } else if (discriminant > EPS) {
    return "1 real root, 2 complex roots";
  } else {
    return "3 real roots (repeated)";
  }
}

function formatFactor(root: number): string {
  if (root < 0) {
    return `(x + ${Math.abs(root)})`;
  } else {
    return `(x - ${root})`;
  }
}

export function factoredForm(coefficients: Coefficients, discriminant: number, roots: ReturnType<typeof calculateRoots>): string {
  const { a } = coefficients;
  const { r1, r2, r3 } = roots;

  if (discriminant > EPS) {
    return "No real factorization";
  } else if (discriminant < -EPS) {
    if (typeof r1.x !== "number" || typeof r2.x !== "number" || typeof r3.x !== "number") {
      return "No real factorization";
    }
    return `${a}${formatFactor(r1.x)}${formatFactor(r2.x)}${formatFactor(r3.x)}`;
  } else {
    if (typeof r1.x !== "number" || typeof r2.x !== "number" || typeof r3.x !== "number") {
      return "No real factorization";
    }

    const same12 = Math.abs(r1.x - r2.x) < EPS;
    const same13 = Math.abs(r1.x - r3.x) < EPS;
    const same23 = Math.abs(r2.x - r3.x) < EPS;

    if (same12 && same13) {
      return `${a}${formatFactor(r1.x)}^3`;
    } else if (same12) {
      return `${a}${formatFactor(r1.x)}^2${formatFactor(r3.x)}`;
    } else if (same13) {
      return `${a}${formatFactor(r1.x)}^2${formatFactor(r2.x)}`;
    } else if (same23) {
      return `${a}${formatFactor(r1.x)}${formatFactor(r2.x)}^2`;
    } else {
      return "No real factorization";
    }
  }
}

export function calculateResult(coefficients: Coefficients): Results {
  const { a, b, c, d } = coefficients;

  const p = calculateParameters(coefficients).p;
  const q = calculateParameters(coefficients).q;
  const discriminant = calculateParameters(coefficients).discriminant;
  const { r1, r2, r3 } = calculateRoots(coefficients, p, q, discriminant);
  const maximum = calculateCriticalPoint(coefficients).maximum;
  const minimum = calculateCriticalPoint(coefficients).minimum;
  const equation = formatPolynomial([a, b, c, d]);
  const { firstDerivative, secondDerivative } = calculateDerivative(coefficients);
  const roots = rootTypes(discriminant);
  const factored = factoredForm(coefficients, discriminant, calculateRoots(coefficients, p, q, discriminant));


  return {
    discriminant,
    equation,
    factored,
    firstDerivative,
    maximum,
    minimum,
    p,
    q,
    r1,
    r2,
    r3,
    roots,
    secondDerivative
  }
}