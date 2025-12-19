
import { UnitId, AlgorithmMetadata, Unit } from './types';

export const ALGORITHMS: AlgorithmMetadata[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    unit: UnitId.UNIT_II,
    description: 'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    pseudocode: [
      'for i from 0 to n-1:',
      '  for j from 0 to n-i-1:',
      '    if arr[j] > arr[j+1]:',
      '      swap(arr[j], arr[j+1])'
    ]
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    unit: UnitId.UNIT_II,
    description: 'Efficiently finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
    complexity: { time: 'O(log n)', space: 'O(1)' },
    pseudocode: [
      'while low <= high:',
      '  mid = (low + high) / 2',
      '  if arr[mid] == target: return mid',
      '  if arr[mid] < target: low = mid + 1',
      '  else: high = mid - 1'
    ]
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    unit: UnitId.UNIT_III,
    description: "Finds the shortest paths between nodes in a graph, which may represent, for example, road networks.",
    complexity: { time: 'O((V + E) log V)', space: 'O(V)' },
    pseudocode: [
      'Initialize distances: dist[source] = 0, others = ∞',
      'While priority queue not empty:',
      '  u = vertex with min dist',
      '  for each neighbor v of u:',
      '    if dist[u] + weight(u,v) < dist[v]:',
      '      dist[v] = dist[u] + weight(u,v)'
    ]
  },
  {
    id: 'fractional-knapsack',
    name: 'Fractional Knapsack',
    unit: UnitId.UNIT_III,
    description: 'Greedy approach to fill a knapsack with items that can be broken into smaller pieces to maximize total value.',
    complexity: { time: 'O(n log n)', space: 'O(1)' },
    pseudocode: [
      'Calculate value/weight ratio for each item',
      'Sort items by ratio descending',
      'For each item:',
      '  If knapsack can fit whole item: add it',
      '  Else: add fraction to fill knapsack'
    ]
  }
];

export const UNITS: Unit[] = [
  {
    id: UnitId.UNIT_I,
    title: 'Algorithms & Complexity',
    topics: ['Asymptotic Notations', 'Big O, θ, Ω', 'Growth of Functions', 'Recurrence Relations'],
    algorithms: []
  },
  {
    id: UnitId.UNIT_II,
    title: 'Sorting & Searching',
    topics: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Binary Search', 'BFS/DFS'],
    algorithms: ALGORITHMS.filter(a => a.unit === UnitId.UNIT_II)
  },
  {
    id: UnitId.UNIT_III,
    title: 'Greedy & Dynamic Programming',
    topics: ['Prims & Kruskal', 'Dijkstra', 'Knapsack', 'Matrix Chain Multiplication'],
    algorithms: ALGORITHMS.filter(a => a.unit === UnitId.UNIT_III)
  },
  {
    id: UnitId.UNIT_IV,
    title: 'Advanced Complexity & TSP',
    topics: ['TSP', 'P vs NP', 'Approximation Algorithms', 'Vertex Cover'],
    algorithms: []
  }
];
