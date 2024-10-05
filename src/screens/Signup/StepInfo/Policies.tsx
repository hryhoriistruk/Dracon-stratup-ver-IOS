import React from 'react'
import {View} from 'react-native'
import {ComAtprotoServerDescribeServer} from '@atproto/api'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'

import {atoms as a, useTheme} from '#/alf'
import {CircleInfo_Stroke2_Corner0_Rounded as CircleInfo} from '#/components/icons/CircleInfo'
import {InlineLinkText} from '#/components/Link'
import {Text} from '#/components/Typography'

export const Policies = ({
  serviceDescription,
  needsGuardian,
  under13,
}: {
  serviceDescription: ComAtprotoServerDescribeServer.OutputSchema
  needsGuardian: boolean
  under13: boolean
}) => {
  const t = useTheme()
  const {_} = useLingui()

  if (!serviceDescription) {
    return <View />
  }

  const tos = validWebLink(serviceDescription.links?.termsOfService)
  const pp = validWebLink(serviceDescription.links?.privacyPolicy)

  if (!tos && !pp) {
    return (
      <View style={[a.flex_row, a.align_center, a.gap_xs]}>
        <CircleInfo size="md" fill={t.atoms.text_contrast_low.color} />

        <Text style={[t.atoms.text_contrast_medium]}>
          <Trans>
            This service has not provided terms of service or a privacy policy.
          </Trans>
        </Text>
      </View>
    )
  }

  const els = []
  if (tos) {
    els.push(
      <InlineLinkText
        label={_(msg`Read the Bluesky Terms of Service`)}
        key="tos"
        to={tos}>
        {_(msg`Terms of Service`)}
      </InlineLinkText>,
    )
  }
  if (pp) {
    els.push(
      <InlineLinkText
        label={_(msg`Read the Bluesky Privacy Policy`)}
        key="pp"
        to={pp}>
        {_(msg`Privacy Policy`)}
      </InlineLinkText>,
    )
  }
  if (els.length === 2) {
    els.splice(
      1,
      0,
      <Text key="and" style={[t.atoms.text_contrast_medium]}>
        {' '}
        and{' '}
      </Text>,
    )
  }

  return (
    <View style={[a.gap_sm]}>
      <Text style={[a.leading_snug, t.atoms.text_contrast_medium]}>
        <Trans>By creating an account you agree to the {els}.</Trans>
      </Text>

      {under13 ? (
        <Text style={[a.font_bold, a.leading_snug, t.atoms.text_contrast_high]}>
          <Trans>You must be 13 years of age or older to sign up.</Trans>
        </Text>
      ) : needsGuardian ? (
        <Text style={[a.font_bold, a.leading_snug, t.atoms.text_contrast_high]}>
          <Trans>
            If you are not yet an adult according to the laws of your country,
            your parent or legal guardian must read these Terms on your behalf.
          </Trans>
        </Text>
      ) : undefined}
    </View>
  )
}

function validWebLink(url?: string): string | undefined {
  return url && (url.startsWith('http://') || url.startsWith('https://'))
    ? url
    : undefined
}
