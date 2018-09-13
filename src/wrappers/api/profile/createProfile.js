// @flow
import type { FbDoc, FbDocRef } from '../../../wrappers/firebase/flowtypes'
import type { Profile } from '../../../modules/profiles/flowtypes'

import { profileModel } from '../../../modules/profiles/models'
import { db, fbTimestamp } from '../../firebase'
import { parseFbDoc } from '../../firebase/firestoreHelpers'

import { getCurrentUserId } from '../../auth'

const createProfileOnAPI = async (): Promise<?Profile> => {
  const userId = getCurrentUserId()
  if (!userId) {
    return undefined
  }

  const payload = {
    owner: userId,
    created: fbTimestamp(),
    updated: fbTimestamp(),
    firstName: '',
    lastName: '',
  }

  const docRef: FbDocRef = db.collection('profiles').doc(userId)
  await docRef.set(payload)

  const doc: FbDoc = await docRef.get()
  return profileModel.fromAPI(parseFbDoc(doc))
}

export default createProfileOnAPI
