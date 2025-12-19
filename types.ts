
export enum UnitId {
  UNIT_I = 'unit-1',
  UNIT_II = 'unit-2',
  UNIT_III = 'unit-3',
  UNIT_IV = 'unit-4'
}

export interface AlgorithmMetadata {
  id: string;
  name: string;
  description: string;
  complexity: {
    time: string;
    space: string;
  };
  pseudocode: string[];
  unit: UnitId;
}

export interface Unit {
  id: UnitId;
  title: string;
  topics: string[];
  algorithms: AlgorithmMetadata[];
}

export interface GraphNode {
  id: number;
  x: number;
  y: number;
  label: string;
  color?: string;
}

export interface GraphEdge {
  from: number;
  to: number;
  weight?: number;
  highlighted?: boolean;
}

export interface VisualizerState {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  visitedNodes: number[];
  currentStep: number;
  isRunning: boolean;
}
