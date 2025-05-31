import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Link } from 'react-router';
import { TextareaAutosize } from '@/components/ui/textarea-autosize';
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
    FileUploadTrigger,
} from '@/components/ui/file-upload';
import { Image, Video, X } from 'lucide-react';

const schema = z.object({
    video: z
        .array(z.custom<File>())
        .min(1, 'Please select at least one file')
        .max(1, 'Please choose only one file'),
    thumbnail: z
        .array(z.custom<File>())
        .min(1, 'Please select at least one file')
        .max(1, 'Please choose only one file'),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
});

export function UploadForm() {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            video: [],
            thumbnail: [],
            title: '',
            description: '',
        },
    });

    return (
        <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="mb-8 animate-fade-in">
                <h1 className="text-2xl font-semibold text-white mb-2">
                    Upload Video
                </h1>
                <p className="text-neutral-400 leading-relaxed">
                    Share your content with the world. Upload your video and
                    reach your audience.
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((data) => console.log(data))}
                    className="space-y-8"
                >
                    <div className="grid gap-10">
                        <FormField
                            control={form.control}
                            name="video"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Video File</FormLabel>
                                    <FormDescription>
                                        Upload your video file
                                    </FormDescription>
                                    <FormControl>
                                        <FileUpload
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            accept="image/*"
                                            maxFiles={2}
                                            onFileReject={(_, message) => {
                                                form.setError('video', {
                                                    message,
                                                });
                                            }}
                                            multiple
                                        >
                                            <FileUploadDropzone className="py-10">
                                                <div className="flex flex-col items-center gap-5 text-center">
                                                    <div className="flex items-center justify-center rounded-full border p-2.5">
                                                        <Video className="size-6 text-muted-foreground" />
                                                    </div>
                                                    <p className="font-medium text-sm">
                                                        Drag and drop your video
                                                        here, or click to browse
                                                    </p>
                                                </div>
                                                <FileUploadTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="mt-2 w-fit"
                                                    >
                                                        Browse files
                                                    </Button>
                                                </FileUploadTrigger>
                                            </FileUploadDropzone>
                                            <FileUploadList>
                                                {field.value.map(
                                                    (file, index) => (
                                                        <FileUploadItem
                                                            key={index}
                                                            value={file}
                                                        >
                                                            <FileUploadItemPreview />
                                                            <FileUploadItemMetadata />
                                                            <FileUploadItemDelete
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="size-7"
                                                                >
                                                                    <X />
                                                                    <span className="sr-only">
                                                                        Delete
                                                                    </span>
                                                                </Button>
                                                            </FileUploadItemDelete>
                                                        </FileUploadItem>
                                                    ),
                                                )}
                                            </FileUploadList>
                                        </FileUpload>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <FormDescription>
                                        Upload a custom thumbnail for your video
                                    </FormDescription>
                                    <FormControl>
                                        <FileUpload
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            accept="image/*"
                                            maxFiles={2}
                                            onFileReject={(_, message) => {
                                                form.setError('video', {
                                                    message,
                                                });
                                            }}
                                            multiple
                                        >
                                            <FileUploadDropzone className="py-10">
                                                <div className="flex flex-col items-center gap-5 text-center">
                                                    <div className="flex items-center justify-center rounded-full border p-2.5">
                                                        <Image className="size-6 text-muted-foreground" />
                                                    </div>
                                                    <p className="font-medium text-sm">
                                                        Drag and drop your
                                                        thumbnail here, or click
                                                        to browse
                                                    </p>
                                                </div>
                                                <FileUploadTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="mt-2 w-fit"
                                                    >
                                                        Browse files
                                                    </Button>
                                                </FileUploadTrigger>
                                            </FileUploadDropzone>
                                            <FileUploadList>
                                                {field.value.map(
                                                    (file, index) => (
                                                        <FileUploadItem
                                                            key={index}
                                                            value={file}
                                                        >
                                                            <FileUploadItemPreview />
                                                            <FileUploadItemMetadata />
                                                            <FileUploadItemDelete
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="size-7"
                                                                >
                                                                    <X />
                                                                    <span className="sr-only">
                                                                        Delete
                                                                    </span>
                                                                </Button>
                                                            </FileUploadItemDelete>
                                                        </FileUploadItem>
                                                    ),
                                                )}
                                            </FileUploadList>
                                        </FileUpload>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-white">
                                Video Details
                            </CardTitle>
                            <CardDescription className="text-neutral-400">
                                Add information about your video to help viewers
                                discover it
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter a title for your video"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <TextareaAutosize
                                                minRows={6}
                                                placeholder="Tell viewers about your video. What's it about? What will they learn or enjoy?"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <div
                        className="flex justify-end space-x-4 pt-4 animate-fade-in-up"
                        style={{ animationDelay: '600ms' }}
                    >
                        <Link to="/">
                            <Button
                                type="button"
                                variant="destructive"
                                className="border-neutral-600 hover:scale-105 transition-all duration-300"
                            >
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            className="bg-white text-neutral-900 hover:bg-neutral-100 font-medium min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 disabled:hover:scale-100"
                        >
                            Upload Video
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
