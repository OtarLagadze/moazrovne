import classes from "./ProblemComponent.module.css";
import Collapsible from "../ui/collapsible/Collapsible";
import { urlFor } from "@/app/libs/sanity";

import { MathJax, MathJaxContext } from 'better-react-mathjax'

const config = {
  loader: { load: ["input/tex", "output/svg"] },
  tex: {
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
    processEscapes: true, // \$ for actual dollar sign
  }
};

function HintList({ hints }) {
  return (
    <>
      {hints.map((hint, index) => (
        <Collapsible key={index} title={`მითითება #${index + 1}`}>
          <MathJax key={hint} className={classes.mathJax}>
            {hint}
          </MathJax>
        </Collapsible>
      ))}
    </>
  );
}

function CommentList({ comments }) {
  return (
    <>
      {comments.map((comment, index) => (
        <Collapsible key={index} title={`კომენტარი #${index + 1}`}>
          <MathJax key={comment} className={classes.mathJax}>
            {comment}
          </MathJax>
        </Collapsible>
      ))}
    </>
  );
}

export default function ProblemComponent({ problem }) {
  if (!problem) return;
  const { taskId, grade, statement, photos, hints, comments } = problem;
  return (
    <MathJaxContext config={config}>
      <div className={classes.problemCard}>
        <div className={classes.problemHeader}>
          <p>#{taskId} ამოცანა</p>
          {grade.from === grade.to ? 
            <p>{grade.to} კლასი</p> : <p>{grade.from}-{grade.to} კლასი</p>
          }
        </div>
        <div className={classes.problemStatement}>
          <MathJax key={statement} className={classes.mathJax}>{statement}</MathJax>
        </div>

        {photos?.length > 0 && false && (
          <div>
            {photos.map((photo, index) => (
              <img
              key={index}
              src={urlFor(photo).url()}
              alt={`Problem photo ${index + 1}`}
              style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            ))}
          </div>
        )}

        { hints &&
          <Collapsible title="მითითებები" >
            <HintList hints={hints}/>
          </Collapsible>
        }

        { comments &&
          <Collapsible title="კომენტარები">
            <CommentList comments={comments}/>
          </Collapsible>
        }
      </div>
    </MathJaxContext>
  );
}
