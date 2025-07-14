import { generateRouteResponse, getRoute } from "./action";

type RouteParams = {
  params: Promise<{
    project_id: string;
    route_id: string;
    route_path: string;
  }>
}

async function generateRoute({
  route_id
}: {
  route_id: string
}) {
  const route = await getRoute(route_id)

  const result = await generateRouteResponse({
    builder: route.builder_generator,
    schema: route.schema
  })

  return Response.json(result)
}

export async function GET(request: Request, { params }: RouteParams) {
  const { route_id } = await params

  return await generateRoute({ route_id })
}

export async function HEAD(request: Request, { params }: RouteParams) {
  const { route_id } = await params

  return await generateRoute({ route_id })
}

export async function POST(request: Request, { params }: RouteParams) {
  const { route_id } = await params

  return await generateRoute({ route_id })
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { route_id } = await params

  return await generateRoute({ route_id })
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const { route_id } = await params

  return await generateRoute({ route_id })
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { route_id } = await params

  return await generateRoute({ route_id })
}