"use client"

import { urlFor } from "@/app/libs/sanity";
import Image from "next/image";
import classes from "./ProblemComponent.module.css";
import difficultyColors from "@/data/difficultyColors.json";
import difficultyOptions from "@/data/filterOptions/difficultyOptions";

import dynamic from "next/dynamic";
const Collapsible = dynamic(() => import("@/components/ui/collapsible/Collapsible"), { ssr: false });
const MathJax = dynamic(() => import('better-react-mathjax').then(mod => mod.MathJax), { ssr: false });
const MathJaxContext = dynamic(() => import('better-react-mathjax').then(mod => mod.MathJaxContext), { ssr: false });

const config = {
  loader: { load: ["input/tex", "output/svg"] },
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true, // \$ for actual dollar sign
  }
};

function Math({ render }) {
  return (
    <MathJax className={classes.mathJax}>
      { render }
    </MathJax>
  )
}

function HintList({ hints, photos, collapsible }) {
  return (
    <>
      {hints?.map((hint, index) => (
        <Collapsible key={index} title={`მითითება #${index + 1}`} shift={false} style={{ backgroundColor: collapsible }}>
          <Math render={hint}/>
        </Collapsible>
      ))}
      {photos?.length > 0 && (
        photos.map((photo, index) => (
          <Collapsible key={index} title={`მითითება #${index + (hints ? hints.length : 0) + 1}`} shift={false} style={{ backgroundColor: collapsible }}>
            <Image
              src={urlFor(photo).url()}
              alt={`hint photo`}
              width={0}
              height={0}
              layout="responsive"
              className={classes.problemImg}
            />
          </Collapsible>
        ))
      )}
    </>
  );
}

function CommentList({ comments, photos, collapsible }) {
  return (
    <>
      {comments?.map((comment, index) => (
        <Collapsible key={index} title={`კომენტარი #${index + 1}`} shift={false} style={{ backgroundColor: collapsible }}>
          <Math render={comment}/>
        </Collapsible>
      ))}
      {photos?.length > 0 && (
        photos.map((photo, index) => (
          <Collapsible key={index} title={`კომენტარი #${index + (comments ? comments.length : 0) + 1}`} shift={false} style={{ backgroundColor: collapsible }}>
            <Image
              src={urlFor(photo).url()}
              alt={`comment photo`}
              width={0}
              height={0}
              layout="responsive"
              className={classes.problemImg}
            />
          </Collapsible>
        ))
      )}
    </>
  );
}

function getDifficultyStyles(difficulty) {
  return difficultyColors[difficulty] || '';
}

export default function ProblemComponent({ data, index }) {
  if (!data) return;
  const { taskId, grade, difficulty, statement, photos, hints, hintPhotos, comments, commentPhotos, solution, solutionPhotos } = data;
  const { card, header, collapsible } = getDifficultyStyles(difficulty);
  return (
    <MathJaxContext config={config} key={index}>
      <div className={classes.problemCard} style={{ backgroundColor: card }}>
        <div className={classes.problemHeader} style={{ backgroundColor: header }}>
          <p>№{taskId} {`${difficulty ? difficultyOptions[difficulty - 1].label : ''}`}</p>
          {grade.from === grade.to ? 
            <p>{grade.to} კლასი</p> : <p>{grade.from}-{grade.to} კლასი</p>
          }
        </div>
        { statement &&
          <div className={classes.problemStatement}>
            <Math render={statement}/>
          </div>
        }
        {photos?.length > 0 && (
          photos.map((photo, index) => (
            <Image
              src={urlFor(photo).url()}
              key={`Problem photo ${index + 1}`}
              alt={`Problem photo`}
              width={0}
              height={0}
              layout="responsive"
              className={classes.problemImg}
              priority
            />
          ))
        )}

        { (hints?.length > 0 || hintPhotos?.length > 0) &&
          <Collapsible key={`hints ${taskId}`} title="მითითებები" shift={true} style={{ backgroundColor: collapsible }}>
            <HintList hints={hints} photos={hintPhotos} collapsible={collapsible}/>
          </Collapsible>
        }

        { (comments?.length > 0 || commentPhotos?.length) > 0 &&
          <Collapsible key={`comments ${taskId}`} title="კომენტარები" shift={true} style={{ backgroundColor: collapsible }}>
            <CommentList comments={comments} photos={commentPhotos} collapsible={collapsible}/>
          </Collapsible>
        }

        { (solution || solutionPhotos?.length > 0) &&
          <Collapsible key={`solution ${taskId}`} title={`ამოხსნა`} shift={false} style={{ backgroundColor: collapsible }}>
            {solution && <Math render={solution}/>}
            {solutionPhotos.map((photo, index) => {
              const imageUrl = urlFor(photo)?.url();
              return imageUrl ? (
                <Image
                  src={imageUrl}
                  key={`Solution photo ${index + 1}`}
                  alt={`Solution photo`}
                  width={0}
                  height={0}
                  layout="responsive"
                  className={classes.problemImg}
                />
              ) : (
                <p key={`Solution photo ${index + 1}`}>დაფიქსირდა შეცდომა</p>
              );
            })}
          </Collapsible>
        }
      </div>
    </MathJaxContext>
  );
}
