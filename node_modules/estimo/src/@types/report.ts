export interface Report {
  name: string
  parseHTML: number
  styleLayout: number
  paintCompositeRender: number
  scriptParseCompile: number
  scriptEvaluation: number
  javaScript: number
  garbageCollection: number
  other: number
  total: number
}
