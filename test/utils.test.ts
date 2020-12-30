import { fromXpub, toXpub } from "../src/utils"
import * as assert from 'assert'
import { bip32 } from "liquidjs-lib"

const xpub = 'xpub661MyMwAqRbcGC851SCJ22vDfA3ModMuFd9NozAt1d3diLCW31jN13wF2tx6uYCKTkjMuKDUNjVuvyMuvieXfv64Fm44MhjMdFFJ2hXcTp4'

const vpub = 'vpub5SLqN2bLY4WeYmUCFE9XRcHV9vrSfD7XY1T32SEaChQREh1KxgvNPpDWq3wnpguqYR4kSzTxW5yyV562WEnAGvb6zcMuB4ZrYJArvtryJjc'

describe('changeVersionBytes', () => {
    it('should be reversable', () => {
        const vpubkey = fromXpub(xpub, 'regtest')
        const xpubAfterVpub = toXpub(vpubkey)
        assert.deepStrictEqual(xpubAfterVpub, xpub)
    })

    it('should be a valid point', () => {
        const vpubToXpub = toXpub(vpub)
        assert.doesNotThrow(() => bip32.fromBase58(vpubToXpub))
    })
})