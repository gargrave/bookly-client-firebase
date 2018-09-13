// @flow
import type { FbDoc, FbDocRef } from '../../../wrappers/firebase/flowtypes'
import type { Profile } from '../../../modules/profiles/flowtypes'

import { profileModel } from '../../../modules/profiles/models'
import { db } from '../../firebase'
import { parseFbDoc } from '../../firebase/firestoreHelpers'

import { getCurrentUserId } from '../../auth'

import createProfileOnAPI from './createProfile'

const fetchProfileFromAPI = async (): Promise<?Profile> => {
  const userId = getCurrentUserId()
  if (!userId) {
    return Promise.resolve(profileModel.empty())
  }

  const docRef: FbDocRef = db.collection('profiles').doc(userId)
  const doc: FbDoc = await docRef.get()
  if (doc.exists) {
    return profileModel.fromAPI(parseFbDoc(doc))
  }
  return await createProfileOnAPI()
}

export default fetchProfileFromAPI
