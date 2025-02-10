import { deleteMenuById } from "@/src/services/menu/deleteMenuById";
import { getMenuItemsById } from "@/src/services/menu/getMenuById";
import { updateMenuById } from "@/src/services/menu/updateMenuItemsById";
import { NextResponse } from "next/server";

type Props = { params: Promise<{ menuId: string }> };
export async function GET(req: Request, { params }: Props) {
  try {
    const header = req.headers.get("Authorization");
    if (!header) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const id = (await params).menuId;
    const menu = await getMenuItemsById({ id: id });
    if (!menu) {
      return NextResponse.json(
        { message: "Menu not found", success: false },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { data: menu, message: "Menu fetch successfully", success: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "Internal Server Error", success: false },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request, { params }: Props) {
  try {
    const data = await req.json();
    const id = (await params).menuId;
    const menu = await getMenuItemsById({ id: id });
    if (!menu) {
      return NextResponse.json({ error: "Menu not found", status: 404 });
    }
    const updatedMenu = await updateMenuById({ data: data, id: id });
    return NextResponse.json({
      message: "Menu updated successfully",
      success: true,
      data: updatedMenu,
    });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    const header = req.headers.get("Authorization");
    if (!header) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const id = (await params).menuId;
    const menu = await getMenuItemsById({ id: id });
    if (!menu) {
      return NextResponse.json(
        {
          success: false,
          message: "Menu not found",
        },
        { status: 404 },
      );
    }
    const deletedMenu = await deleteMenuById({ id: id });
    return NextResponse.json(
      {
        message: "Menu deleted successfully",
        success: true,
        data: deletedMenu,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "Internal Server Error", success: false },
      { status: 500 },
    );
  }
}
