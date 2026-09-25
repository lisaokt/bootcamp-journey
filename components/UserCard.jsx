import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useFavorite } from "@/context/FavoriteContext";

export default function UserCard({ user }) {
  const { isFavorite, toggleFavorite} = useFavorite();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600">
          {user.email}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {user.company.name}
        </p>

        <Button className="mt-4">
          View Profile
        </Button>

         {/* ← tambah tombol ini */}
        <Button
          onClick={() => toggleFavorite(user)}
          variant={isFavorite(user.id) ? "default" : "outline"}
          className="mt-2"
        >
          {isFavorite(user.id) ? "♥ Favorite" : "♡ Add Favorite"}
        </Button>
      </CardContent>
    </Card>
  );
}