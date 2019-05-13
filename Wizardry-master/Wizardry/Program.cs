using System;
using System.Net;
using Arrowgene.Services.Buffers;
using Arrowgene.Services.Logging;
using Arrowgene.Services.Networking.Tcp;
using Arrowgene.Services.Networking.Tcp.Consumer;
using Arrowgene.Services.Networking.Tcp.Server.AsyncEvent;

namespace Wizardry
{
    internal class Program : IConsumer
    {
        private static void Main(string[] args) => new Program();

        public Program()
        {
            LogProvider.GlobalLogWrite += LogProviderOnGlobalLogWrite;
            AsyncEventServer server = new AsyncEventServer(IPAddress.Any, 60000, this);
            server.Start();
            Console.WriteLine("Press any key to exit..");
            Console.ReadKey();
            server.Stop();
        }

        private void LogProviderOnGlobalLogWrite(object sender, LogWriteEventArgs e)
        {
            Console.WriteLine(e.Log);
        }

        public void OnStart()
        {
        }

        public void OnStarted()
        {
        }

        public void OnReceivedData(ITcpSocket socket, byte[] data)
        {
            IBuffer buffer = new StreamBuffer(data);
            buffer.SetPositionStart();

            Console.WriteLine("===RECV===");
            Console.WriteLine(buffer.ToAsciiString(true));
            Console.WriteLine(buffer.ToHexString('-'));
            Console.WriteLine("===RECV===");

            int size = buffer.ReadInt16(Endianness.Big);
            int opCode = buffer.ReadInt16(Endianness.Big);
            Console.WriteLine($"Recv Size: {size} OP: {opCode}");

            IBuffer res = null;
            if (opCode == 0x0557)
            {
                int minor = buffer.ReadInt32();
                int major = buffer.ReadInt32();

                Console.WriteLine($"Recv Version {minor} - {major}");
                res = new StreamBuffer();
                res.WriteInt16(0); // Size
                res.WriteInt16(0x0558, Endianness.Big); //OP
                res.WriteInt32(0); //Error
                res.WriteInt32(minor); //Minor
                res.WriteInt32(major); //Major
                int pos = res.Position;
                res.SetPositionStart();
                res.WriteInt16((short) (pos - 2), Endianness.Big);
            }

            if (res != null)
            {
                socket.Send(res.GetAllBytes());
                Console.WriteLine("===SEND===");
                Console.WriteLine(res.ToAsciiString(true));
                Console.WriteLine(res.ToHexString('-'));
                Console.WriteLine("===SEND===");
            }
        }

        public void OnClientDisconnected(ITcpSocket socket)
        {
            Console.WriteLine("Client Disconnected");
        }

        public void OnClientConnected(ITcpSocket socket)
        {
            Console.WriteLine("Client Connected");
        }

        public void OnStop()
        {
        }

        public void OnStopped()
        {
        }
    }
}