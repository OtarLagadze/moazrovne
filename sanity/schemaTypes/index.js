import {aboutType} from './about'
import {blogType} from './blog'
import {nationalExamsType, practiceBookType, practiceTestsType} from './entrants'
import {faqType} from './faq'
import {galleryType} from './gallery'
import {moazrovneProblemsType, testsType} from './moazrovne'
import {olympicsType} from './olympics'
import {problemsType} from './problems'
import {instructionType} from './instruction'
import {eventsType} from './events'
import {eventTestsType} from './eventTests'

export const schemaTypes = [
  problemsType, 
  moazrovneProblemsType,
  testsType, 
  nationalExamsType, 
  practiceTestsType, 
  eventTestsType,
  instructionType,
  eventsType,
  aboutType, 
  blogType, 
  olympicsType,
  galleryType, 
  faqType, 
  practiceBookType,
]
