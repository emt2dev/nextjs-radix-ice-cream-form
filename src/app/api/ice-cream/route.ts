import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, date, flavor } = body

    if (!name || !date || !flavor) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const submission = await prisma.iceCreamSubmission.create({
      data: {
        name,
        date: new Date(date),
        flavor,
      },
    })

    return NextResponse.json({ message: 'Submission saved!', submission })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
