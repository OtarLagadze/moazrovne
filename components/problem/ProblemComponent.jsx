"use client"

import classes from "./ProblemComponent.module.css";
import dynamic from "next/dynamic";
const Collapsible = dynamic(() => import("@/components/ui/collapsible/Collapsible"), { ssr: false });
const MathJax = dynamic(() => import('better-react-mathjax').then(mod => mod.MathJax), { ssr: false });
const MathJaxContext = dynamic(() => import('better-react-mathjax').then(mod => mod.MathJaxContext), { ssr: false });

import { urlFor } from "@/app/libs/sanity";

const config = {
  loader: { load: ["input/tex", "output/svg"] },
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["$", "$"]],
    processEscapes: true, // \$ for actual dollar sign
  }
};

function HintList({ hints, photos }) {
  return (
    <>
      {hints?.map((hint, index) => (
        <Collapsible key={index} title={`მითითება #${index + 1}`} shift={false}>
          <MathJax key={hint} className={classes.mathJax}>
            {hint}
          </MathJax>
        </Collapsible>
      ))}
      {photos?.length > 0 && (
        photos.map((photo, index) => (
          <Collapsible key={index} title={`მითითება #${index + (hints ? hints.length : 0) + 1}`} shift={false}>
            <img
              key={index}
              src={urlFor(photo).url()}
              alt={`hint photo ${index + hints?.length + 1}`}
              className={classes.problemImg}
            />
          </Collapsible>
        ))
      )}
    </>
  );
}

function CommentList({ comments, photos }) {
  return (
    <>
      {comments?.map((comment, index) => (
        <Collapsible key={index} title={`კომენტარი #${index + 1}`} shift={false}>
          <MathJax key={comment} className={classes.mathJax}>
            {comment}
          </MathJax>
        </Collapsible>
      ))}
      {photos?.length > 0 && (
        photos.map((photo, index) => (
          <Collapsible key={index} title={`კომენტარი #${index + (comments ? comments.length : 0) + 1}`} shift={false}>
            <img
              key={index}
              src={urlFor(photo).url()}
              alt={`comment photo ${index + comments?.length + 1}`}
              className={classes.problemImg}
            />
          </Collapsible>
        ))
      )}
    </>
  );
}

export default function ProblemComponent({ data }) {
  if (!data) return;
  const { taskId, grade, statement, photos, hints, hintPhotos, comments, commentPhotos, solution, solutionPhotos } = data;
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

        {photos?.length > 0 && (
          photos.map((photo, index) => (
            <img
            key={index}
            src={urlFor(photo).url()}
            alt={`Problem photo ${index + 1}`}
            className={classes.problemImg}
            />
          ))
        )}

        { (hints?.length > 0 || hintPhotos?.length > 0) &&
          <Collapsible title="მითითებები" shift={true}>
            <HintList hints={hints} photos={hintPhotos}/>
          </Collapsible>
        }

        { (comments?.length > 0 || commentPhotos?.length) > 0 &&
          <Collapsible title="კომენტარები" shift={true}>
            <CommentList comments={comments} photos={commentPhotos}/>
          </Collapsible>
        }

        { (solution || solutionPhotos?.length > 0) &&
          <Collapsible title={`ამოხსნა`} shift={false}>
            <MathJax className={classes.mathJax}>
              {solution}
            </MathJax>
            {solutionPhotos?.length > 0 && (
              <div>
                {solutionPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={urlFor(photo).url()}
                    alt={`Problem photo ${index + 1}`}
                    className={classes.problemImg}
                  />
                ))}
              </div>
            )}
          </Collapsible>
        }
      </div>
    </MathJaxContext>
  );
}
