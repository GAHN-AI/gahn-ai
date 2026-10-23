import { redirect } from "next/navigation";

/** Retired instructor links return to the public Learning World directory. */
export default function InstructorPage() { redirect("/#learning-worlds"); }
