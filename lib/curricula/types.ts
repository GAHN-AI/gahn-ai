/** Editorial plans only. These are not published lectures or accredited courses. */
export type CareerModuleDraft = readonly [
  title: string,
  lessons: readonly string[],
  practice: string,
  outcome: string,
];

export type CareerCourseDraft = {
  entry: string;
  requirements: readonly string[];
  modules: readonly CareerModuleDraft[];
};
